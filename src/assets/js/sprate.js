//将需要逐条显示的内容拆分开
export function splitList(list1,list2){
   // console.log(list1.length);
   let tmpArr,i;
   tmpArr=list1.split('@');
    for(i=0;i<tmpArr.length;i++){
        list2[i]='*  '+tmpArr[i];
        //console.log(list2[i]);
    }
    return list2;
}