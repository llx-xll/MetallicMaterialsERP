import { bitable } from '@lark-base-open/js-sdk'
import { caiGouToXianCun } from "./function01"
import { xianCunToShengChan } from "./function02"
import { chengPinToXianCun } from "./function03"


document.getElementById('button_1').addEventListener('click', async function () {
  console.log('button1 clicked')
  caiGouToXianCun();
});


document.getElementById('button_2').addEventListener('click', async function () {
  console.log('button2 clicked')
  xianCunToShengChan();
})


document.getElementById('button_3').addEventListener('click', async function () {
  console.log('button3 clicked')
  chengPinToXianCun();
})
