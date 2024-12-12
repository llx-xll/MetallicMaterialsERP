import { bitable } from '@lark-base-open/js-sdk'
import { getViewIdFromMetaByName, copyRecordsToOtherTable } from "./feishuHelp"


// 01 采购仓库->现存量
export async function caiGouToXianCun() {
  console.log('01 采购仓库->现存量');
  await bitable.ui.showToast({
    toastType: 'loading',
    message: `正在拷贝“采购仓库”到“现存量”`
  })

  const inputTableName = "采购仓库";
  const outputTableName = "现存量";
  // 1、读取输入、输出表格
  const inputTable = await bitable.base.getTableByName(inputTableName);
  const inputTableId = inputTable.context[0];
  const outputTable = await bitable.base.getTableByName(outputTableName);
  const outputTableId = outputTable.context[0];
  console.log('inputTable:', inputTable, ',  inputTableId:', inputTableId);
  console.log('outputTable:', outputTable, ',  outputTableId:', outputTableId);

  // 2、获取输入、输出表格所有字段名
  const inputFieldMetaList = await inputTable.getFieldMetaList();
  const outputFieldMetaList = await outputTable.getFieldMetaList();
  console.log("inputFieldMetaList: ", inputFieldMetaList);
  console.log("outputFieldMetaList: ", outputFieldMetaList);
  const stateFieldName = "📌状态";
  const stateField = await inputTable.getField(stateFieldName);
  const stateOptions = await stateField.getOptions();
  console.log("stateFieldName: ", stateFieldName, ",  stateField: ", stateField, ",  stateOptions: ", stateOptions);


  // 3、获取输入、输出表格的所有视图信息，获取基础信息视图的id
  const inputViewMetaList = await inputTable.getViewMetaList();
  const outputViewMetaList = await outputTable.getViewMetaList();
  console.log("inputViewMetaList: ", inputViewMetaList);
  console.log("outputViewMetaList: ", outputViewMetaList);
  const inputBaseInfoViewId = getViewIdFromMetaByName(inputViewMetaList, "基础信息");
  const outputBaseInfoViewId = getViewIdFromMetaByName(outputViewMetaList, "基础信息");
  console.log("inputBaseInfoViewId: ", inputBaseInfoViewId);
  console.log("outputBaseInfoViewId: ", outputBaseInfoViewId);


  const inputBaseInfoView = await inputTable.getViewById(inputBaseInfoViewId);
  const inputRecordIdList = await inputBaseInfoView.getVisibleRecordIdList();
  console.log("inputRecordIdList: ", inputRecordIdList);
  
  // 4、读取待copy的记录
  const copyRecords = [];
  let pageToken = "";
  while(true){
    // 循环读取
    let inputRecordsResponse = {};
    if(pageToken === ""){
      inputRecordsResponse = await inputTable.getRecords({ pageSize: 100 })
    }else{
      inputRecordsResponse = await inputTable.getRecords({ pageSize: 100, pageToken})
    }
    console.log('inputRecordsResponse:', inputRecordsResponse)
    const inputRecords = inputRecordsResponse.records

    // 遍历所有Records
    for (const record of inputRecords) {
      console.log(`record=`, record);
      const recordId = record.recordId;

      const stateValue = await stateField.getValue(recordId);
      console.log("stateValue:", stateValue);
      if(stateValue && stateValue.text === "已同步"){
        continue;
      }else{
        copyRecords.push(record);
        // 1、更新状态
        const res = await stateField.setValue(recordId, stateOptions[0].id);
        console.log("setRecord res:", res);
      }
    }

    // 读取完成
    if(inputRecordsResponse.hasMore){
      if(inputRecordsResponse.pageToken){
        pageToken = inputRecordsResponse.pageToken;
      }else{
        break;
      }
    }else{
      console.log("read all finished");
      break;
    }
  }

  // 5、写入到输出表格
  if(copyRecords.length > 0){
    console.log("copyRecords: ", copyRecords);
    const dstRecords = copyRecordsToOtherTable(inputFieldMetaList, outputFieldMetaList, copyRecords);
    console.log("dstRecords: ", dstRecords);
    const res = await outputTable.addRecords(dstRecords);
    console.log("addRecords res:", res)
  }

  await bitable.ui.showToast({
    toastType: 'success',
    message: `完成${copyRecords.length}个采购入库`
  })
  return;
}
