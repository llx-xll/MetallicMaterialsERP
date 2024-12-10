import { bitable } from '@lark-base-open/js-sdk'
import { caiGouToXianCun } from "./functionUtils"


// 01 采购仓库->现存量
document.getElementById('button_1').addEventListener('click', async function () {
  console.log('button1 clicked')
  caiGouToXianCun();

  alert('已经更新"02b"表格，请输入订单数量')
});



// 拆包
function getBagNum(num, numPerBag, remaindNum){
  const numOfBags = Math.floor(num / numPerBag)
  const remaindNumOfBags = num % numPerBag
  const numOfBagsList = []
  for (let i = 0; i < numOfBags; i++) {
    numOfBagsList.push(numPerBag)
  }
  if(remaindNumOfBags > 0){
    if(remaindNumOfBags > remaindNum){ // 余数大于分包条件
      numOfBagsList.push(remaindNumOfBags)
    }else{ // 余数小于分包条件
      numOfBagsList[numOfBagsList.length - 1] += remaindNumOfBags // 最后一个包加上余数
    }
  }
  return numOfBagsList
}

document.getElementById('button_2').addEventListener('click', async function () {
  console.log('button2 clicked')

  // 1、读取输入输出表格
  const table02b = await bitable.base.getTableByName('02b-输入订单数量')
  const table02c = await bitable.base.getTableByName('02c-大货订单')
  const table02d = await bitable.base.getTableByName('02d-任务工单')
  console.log("table02b: ", table02b);
  console.log("table02c: ", table02c);
  console.log("table02d: ", table02d);

  const field_02b_1 = await table02b.getField('产品货号');
  const field_02b_2 = await table02b.getField('SKU编号');
  const field_02b_3 = await table02b.getField('颜色');
  const field_02b_4 = await table02b.getField('尺码');
  const field_02b_5 = await table02b.getField('数量');
  const field_02b_6 = await table02b.getField('单位');
  const field_02b_7 = await table02b.getField('分包条件');
  const field_02b_8 = await table02b.getField('余数条件');
  const field_02b_9 = await table02b.getField('下单日期');
  const field_02b_10 = await table02b.getField('客户名称');


  const field_02c_1 = await table02c.getField('产品货号');
  const field_02c_2 = await table02c.getField('SKU编号');
  const field_02c_3 = await table02c.getField('颜色');
  const field_02c_4 = await table02c.getField('尺码');
  const field_02c_5 = await table02c.getField('数量');
  const field_02c_6 = await table02c.getField('单位');
  const field_02c_7 = await table02c.getField('分包条件');
  const field_02c_8 = await table02c.getField('余数条件');
  const field_02c_9 = await table02c.getField('下单日期');
  const field_02c_10 = await table02c.getField('客户名称');

  const field_02d_1 = await table02d.getField('产品货号');
  const field_02d_2 = await table02d.getField('SKU编号');
  const field_02d_3 = await table02d.getField('颜色');
  const field_02d_4 = await table02d.getField('尺码');
  const field_02d_5 = await table02d.getField('每包数量');
  const field_02d_6 = await table02d.getField('包号');
  const field_02d_7 = await table02d.getField('备注');
  const beizhu_Meta = await field_02d_7.getMeta();
  const field_02d_8 = await table02c.getField('下单日期');
  const field_02d_9 = await table02d.getField('客户名称');
  const field_02d_10 = await table02c.getField('单位');


  const allRecordsResponse = await table02b.getRecords({ pageSize: 100 })
  console.log('allRecordsResponse:', allRecordsResponse)
  const allRecords = allRecordsResponse.records
  for (let i = 0; i < allRecords.length; i++) {
    const recordFields = allRecords[i].fields
    console.log(`recordFields_${i}=`, recordFields)
    if(recordFields[field_02b_5.id]) {
      // 1、copy到订单表达
      await table02c.addRecord({
            fields:{
              [field_02c_1.id]: recordFields[field_02b_1.id],
              [field_02c_2.id]: recordFields[field_02b_2.id],
              [field_02c_3.id]: recordFields[field_02b_3.id],
              [field_02c_4.id]: recordFields[field_02b_4.id],
              [field_02c_5.id]: recordFields[field_02b_5.id],
              [field_02c_6.id]: recordFields[field_02b_6.id],
              [field_02c_7.id]: recordFields[field_02b_7.id],
              [field_02c_8.id]: recordFields[field_02b_8.id],
              [field_02c_9.id]: recordFields[field_02b_9.id],
              [field_02c_10.id]: recordFields[field_02b_10.id],
            }
          })

      // 2、拆包到任务工单
      const num = recordFields[field_02b_5.id]
      const numPerBag = recordFields[field_02b_7.id]
      const remaindNum = recordFields[field_02b_8.id]
      const numOfBagsList = getBagNum(num, numPerBag, remaindNum)
      console.log(`num=${num}, numPerBag=${numPerBag}, remaindNum=${remaindNum}, numOfBagsList=`, numOfBagsList)
      const recordList = []
      for (let j = 0; j < numOfBagsList.length; j++) {
        let beizhuStr = {id: beizhu_Meta.property.options[0].id}
        if(numOfBagsList[j] !== numPerBag) {
          beizhuStr = {id: beizhu_Meta.property.options[1].id}
        }

        const record = {
          fields:{
            [field_02d_1.id]: recordFields[field_02b_1.id],  // 产品编号
            [field_02d_2.id]: recordFields[field_02b_2.id],  // sku
            [field_02d_3.id]: recordFields[field_02b_3.id],  // 颜色
            [field_02d_4.id]: recordFields[field_02b_4.id],  // 尺码
            [field_02d_5.id]: numOfBagsList[j], // 每包数量
            [field_02d_6.id]: j+1, // 包号
            [field_02d_7.id]: beizhuStr, // 备注
            [field_02d_8.id]: recordFields[field_02b_9.id],  // 下单日期
            [field_02d_9.id]: recordFields[field_02b_10.id],  // 客户名称
            [field_02d_10.id]: recordFields[field_02b_6.id],  // 单位
          }
        }
        recordList.push(record)
      }
      table02d.addRecords(recordList);

    }
  }

  alert('新订单已加入"02c-大货订单"，分包情况已加入"02d-任务工单"')
})
