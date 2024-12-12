import { bitable } from '@lark-base-open/js-sdk'
import { getFieldIdFromMetaByName, getViewIdFromMetaByName, copyRecordsToOtherTable } from "./feishuHelp"


export async function xianCunToShengChan() {
  console.log('02 现存量->生产加工单');
  await bitable.ui.showToast({
    toastType: 'loading',
    message: `正在剪切“现存量”到“生产加工单”`
  })

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
  const inputRecordIdList = await inputTable.getRecordIdList();
  console.log("inputRecordIdList: ", inputRecordIdList);
  const selectRecordIdList = await inputBaseInfoView.getSelectedRecordIdList();
  console.log("selectRecordIdList: ", selectRecordIdList);
  
  // 4、读取待剪切的记录
  const cutRecords = [];
  // 遍历所有RecordsId
  for (const recordId of selectRecordIdList) {
    console.log(`recordId=`, recordId);
    const record = await inputTable.getRecordById(recordId);
    console.log("record: ", record);
    cutRecords.push(record);
    const res = await inputTable.deleteRecord(recordId); // 删除记录
    console.log("deleteRecord, res: ", res);
  }

  // 5、写入到输出表格
  if(cutRecords.length > 0){
    console.log("cutRecords: ", cutRecords);
    const dstRecords = copyRecordsToOtherTable(inputFieldMetaList, outputFieldMetaList, cutRecords);
    await outputTable.addRecords(dstRecords);
  }


  await bitable.ui.showToast({
    toastType: 'success',
    message: `完成${copyRecords.length}个物料入加工单`
  })
  return;
}
