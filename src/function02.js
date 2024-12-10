import { bitable } from '@lark-base-open/js-sdk'
import { getFieldIdFromMetaByName, getViewIdFromMetaByName, copyRecords } from "./feishuHelp"


export async function xianCunToShengChan() {
  console.log('02 现存量->生产工单');

  const inputTableName = "现存量";
  const outputTableName = "生产加工单";
  // 1、读取输入、输出表格
  const inputTable = await bitable.base.getTableByName(inputTableName);
  const outputTable = await bitable.base.getTableByName(outputTableName);
  console.log('inputTable:', inputTable);
  console.log('outputTable:', outputTable);

  // 2、获取输入、输出表格所有字段名
  const inputFieldMetaList = await inputTable.getFieldMetaList();
  const outputFieldMetaList = await outputTable.getFieldMetaList();
  console.log("inputFieldMetaList: ", inputFieldMetaList);
  console.log("outputFieldMetaList: ", outputFieldMetaList);


  // 3、获取输入表格的所有视图信息，获取基础信息视图的id
  const inputViewMetaList = await inputTable.getViewMetaList();
  console.log("inputViewMetaList: ", inputViewMetaList);
  const inputBaseInfoViewId = getViewIdFromMetaByName(inputViewMetaList, "基础信息");
  console.log("inputBaseInfoViewId: ", inputBaseInfoViewId);
  const inputBaseInfoView = await inputTable.getViewById(inputBaseInfoViewId);

  // 4、获取选中的记录
  const selectRecordIdList = await inputBaseInfoView.getSelectedRecordIdList();
  console.log("selectRecordIdList: ", selectRecordIdList);
  
  // 4、读取待剪切的记录
  const cutRecords = [];
  // 遍历所有RecordsId
  for (const recordId of selectRecordIdList) {
    console.log(`recordId=`, recordId);
    const record = await inputTable.getRecordById(recordId);
    cutRecords.push(cutRecords[i]);
    const res = await inputTable.deleteRecord(recordId); // 删除记录
    console.log("deleteRecord, res: ", res);
  }

  // 5、写入到输出表格
  if(cutRecords.length > 0){
    console.log("cutRecords: ", cutRecords);
    const dstRecords = copyRecords(inputFieldMetaList, outputFieldMetaList, cutRecords);
    await outputTable.addRecords(dstRecords);
  }

  return





 


  //获取当前所选的信息。 Get the current selection
  const selection = await bitable.base.getSelection();
  console.log("selection: ", selection);
  //通过tableId获取table数据表。 Find current table by tableId
  const selectTableId = selection.tableId;
  const selectRecordId = selection.recordId;
  console.log("selectTableId:", selectTableId);
  console.log("selectRecordId", selectRecordId)
  return;

  // const table = await bitable.base.getTableById(selection?.tableId);
  // //获取table数据表的字段列表元信息。Get table's field meta list
  // const fieldMetaList = await table.getFieldMetaList();
  // //找到名为"Multiline" 或 "多行文本" 的字段元信息。 Find the field with the same name as Multiline or 多行文本
  // const textField = fieldMetaList.find(({ name }) => name === 'Multiline' || name === '多行文本');
  // //获取table的所有记录的ID。 Get all records
  // const recordIdList = await table.getRecordIdList();
  // for (let i = 0; i < recordIdList.length; i++) {
  //   //获取单元格字符串形式的值。 Get cell string from specified fieldId and recordId
  //   const cellString = await table.getCellString(textField?.id!, recordIdList[i]!);
  //   if (cellString?.includes(findText)) {
  //     const newText = cellString.replaceAll(findText, replaceText);
  //     //更新单元格的值 Update the value of the specified fieldId and recordId
  //     await table.setCellValue(textField?.id!, recordIdList[i]!, [{
  //       type: IOpenSegmentType.Text,
  //       text: newText,
  //     }]);
  //   }
  // }

  const allRecordsResponse = await table02a.getRecords({ pageSize: 100 })
  console.log('allRecordsResponse:', allRecordsResponse)
  const allRecords = allRecordsResponse.records
  for (let i = 0; i < allRecords.length; i++) {
    console.log(`allRecords[${i}]=`, allRecords[i])
    const recordFields = allRecords[i].fields
    if(recordFields[field_02a_1.id]) {
      productIdList.push(recordFields[field_02a_1.id][0].text)
    }
    if(recordFields[field_02a_2.id]) {
      colorList.push(recordFields[field_02a_2.id][0].text)
    }
    if(recordFields[field_02a_3.id]) {
      sizeList.push(recordFields[field_02a_3.id][0].text)
    }
    if(recordFields[field_02a_4.id]) {
      numPerBagList.push(recordFields[field_02a_4.id])
    }
    if(recordFields[field_02a_5.id]) {
      remaindNumList.push(recordFields[field_02a_5.id])
    }
  }
  console.log('productIdList=', productIdList)
  console.log('colorList=', colorList)
  console.log('sizeList=', sizeList)
  console.log('numPerBagList=', numPerBagList)
  console.log('remaindNumList=', remaindNumList)  
  let numPerBag = 50;
  let remaindNum = 30;
  if(numPerBagList.length > 0){
    numPerBag = numPerBagList[0]
  }
  if(remaindNumList.length > 0){
    remaindNum = remaindNumList[0]
  }


  // 2、清空订单数量表
  const table02b = await bitable.base.getTableByName('02b-输入订单数量')
  const t02b_recordIdList = await table02b.getRecordIdList()
  console.log('t02b_recordIdList=', t02b_recordIdList)
  if(t02b_recordIdList.length > 0){
    await table02b.deleteRecords(t02b_recordIdList);
  }
  const field_02b_1 = await table02b.getField('产品货号');
  const field_02b_2 = await table02b.getField('颜色');
  const field_02b_3 = await table02b.getField('尺码');
  const field_02b_4 = await table02b.getField('分包条件');
  const field_02b_5 = await table02b.getField('余数条件');
  console.log('field_02b_1:', field_02b_1)
  console.log('field_02b_2:', field_02b_2)
  console.log('field_02b_3:', field_02b_3)
  console.log('field_02b_4:', field_02b_4)
  console.log('field_02b_5:', field_02b_5)

  // 3、输出到订单数量表格
  const recordList = []
  for (let i = 0; i < productIdList.length; i++) {
    for (let k = 0; k < colorList.length; k++) {
      for (let l = 0; l < sizeList.length; l++) {
        const record = {
          fields:{
            [field_02b_1.id]: productIdList[i],
            [field_02b_2.id]: colorList[k],
            [field_02b_3.id]: sizeList[l],
            [field_02b_4.id]: numPerBag,
            [field_02b_5.id]: remaindNum,
          }
        }
        recordList.push(record)
      }
    }
  }
  if(recordList.length > 0){
    await table02b.addRecords(recordList)
  }

  alert('已经更新"02b"表格，请输入订单数量')
}

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
