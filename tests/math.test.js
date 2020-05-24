const{calculatetip,farahtocel,celstofareg,add}=require('../src/math')
test('Helllo world',()=>
{

})
/* test('This should fail',()=>
{
    throw new Error('failure')
}) */
test('calculatr tip',()=>
{
const total=calculatetip(10,.3)
expect(total).toBe(13)
})
test('calculatr tip with default value',()=>
{
const total=calculatetip(10)
expect(total).toBe(12.5)
})
test('cels to farah',()=>
{
const total=celstofareg(32)
expect(total).toBe(0)
})
test(' farah to cels',()=>
{
const total=farahtocel(0)
expect(total).toBe(32)
})
test('Aysnc demo',(mansi)=>
{
  setTimeout(()=>
  {
    expect(1).toBe(1)
    mansi()
  },2000 )
})
test('add',(done)=>
{
add(4,3).then((sum)=>
{
expect(sum).toBe(7)
done()
})
})
test('should add 2 num',async()=>
{
const sum=await add(4,7)
expect(sum).toBe(11)
})

