const calculatetip=(total,tippercent=0.25)=>
{
const tip=total*tippercent
return tip+total
}
const celstofareg=(temp)=>
{
    return(temp-32)/1.8
}
const farahtocel=(temp)=>
{
    return (temp*1.8)+32
}

const add=(a,b)=>{
    return new Promise((resolve,reject)=>
    {
      setTimeout(()=>
      {
          if(a<0 || b<0)
          return reject('num should be positive')
        resolve(a+b)
      },2000)
    })}
module.exports={calculatetip,farahtocel,celstofareg,add}