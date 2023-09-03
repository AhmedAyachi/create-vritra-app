

module.exports=[
    //{name:"SecondView"},
].map((webview,i)=>({
    backgroundColor:globalThis.backgroundColor,
    ...webview,
    id:webview.name.toLowerCase(),
    file:`index${i+1}.html`,
}));
