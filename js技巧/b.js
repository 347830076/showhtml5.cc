define(['./a.js'],function(a){
    return {
     bget:function(data){
         console.log(a.get(data));
         return data;
     }
    }
})