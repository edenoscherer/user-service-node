export const MyTestFunction = (name:string)=>{
  return `hello ${name}`;
}


const main = async ()=>{
  console.log(MyTestFunction('world'));
  console.log(MyTestFunction('Edeno'));
}

main().catch(console.error).finally(()=>{
  console.log('done');
});
