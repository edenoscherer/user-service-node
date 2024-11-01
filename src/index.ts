const main = async ()=>{
  console.log('hello world');
}

main().catch(console.error).finally(()=>{
  console.log('done');
  process.exit(0);
});
