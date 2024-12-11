
export function getFieldIdFromMetaByName(fieldMateList, fieldName){
  let fieldId = "";
  for(const item of fieldMateList){
    if(item.name === fieldName){
      fieldId = item.id;
      break;
    }
  }
  return fieldId;
}
export function getFieldFromMetaByName(fieldMateList, fieldName){
  for(const item of fieldMateList){
    if(item.name === fieldName){
      return item;
    }
  }
  return undefined;
}

export function getViewIdFromMetaByName(viewMateList, viewName){
  let viewId = "";
  for(const item of viewMateList){
    if(item.name === viewName){
      viewId = item.id;
      break;
    }
  }
  return viewId;
}



// 两个tabel的字段匹配
export function matchFields(srcFieldMateList, dstFieldMateList){
  let fieldIdSrcToDst = {};
  // const noCopyTypeList = [20, 21];
  const noCopyTypeList = [];
  for(const srcFieldMate of srcFieldMateList){
    const srcId = srcFieldMate.id;
    const srcType = srcFieldMate.type;
    const srcName = srcFieldMate.name;
    const dstField = getFieldFromMetaByName(dstFieldMateList, srcName); // 按名字查找
    if(dstField){ 
      if(dstField.type === srcType){
        if(!noCopyTypeList.includes(dstField.type)){
          fieldIdSrcToDst[srcId] = dstField.id;
        }
      }
    }
  }
  return fieldIdSrcToDst;
}

export function copyRecordsToOtherTable(srcFieldMateList, dstFieldMateList, srcRecords){
  let outRecords = [];
  // 获取字段id对应关系
  const fieldIdMatch = matchFields(srcFieldMateList, dstFieldMateList);
  console.log("fieldIdMatch: ", fieldIdMatch);
  // 执行copy赋值
  for(const record of srcRecords){
    const dstFields = {};
    const srcFields = record.fields;
    for(const fieldId in srcFields){
      const dstFieldId = fieldIdMatch[fieldId];
      if(dstFieldId){
        dstFields[dstFieldId] = srcFields[fieldId];
      }
    }
    outRecords.push({fields: dstFields});
  }
  return outRecords;
}