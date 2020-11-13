 export function calendar(){
                function selectFun(eleId,start,end){                    
                    for(start;start<=end;start++){
                        eleId.add(new Option(start,start));
                    }
                }
                var startY=2018;
                var end=new Date().getFullYear();
                var year=document.getElementById("year");
                var month=document.getElementById("month");
               // var day=document.getElementById("day");
                selectFun(year,startY,end);
                year.onchange=function(){
                    month.length=1;
                  //  day.length = 1;
                    if(this.value!=0){                        
                        selectFun(month,1,12);
                    }
                }
                month.onchange=function(){
                  //  day.length = 1;
                    var value=this.value;
                    if(value!=0){
                        if(value==2){
                           // console.log('2----');
                            if(ifRunYear(year.value)){
                             //   selectFun(day,1,29);
                            }else{
                              //  selectFun(day,1,28);
                            }
                        }else if(value==4||value==6||value==9||value==11){
                           // console.log('30----');
                           // selectFun(day,1,30);
                        }else{
                           // console.log('31----');
                           // selectFun(day,1,31);
                        }                        
                    }                    
                }
                function ifRunYear(year){
                    return (year% 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0);
                }
            }
			