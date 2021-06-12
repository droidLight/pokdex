function searchProxy(){

    const searchHandler = {
        set: function(obj, prop, value){
            
            if(prop === "saveData"){
                if(value!==undefined){        
                    localStorage.setItem("poke-data", JSON.stringify(value));    
                    localStorage.setItem("is-error", false);                
                }else{
                    localStorage.setItem("is-error", true);
                }
                return Reflect.set(...arguments);
            }
        },
        get: function (obj, prop) {
            if(prop === "getData"){
                let isError = (localStorage.getItem("is-error")==="true"); 
                if(isError){
                    return {status: "error"};
                }else{
                    let temp = JSON.parse(localStorage.getItem("poke-data"));
                    temp.status = "ok";
                    return temp;
                }
            }
        }
    }


    return new Proxy({}, searchHandler);
}

export default searchProxy;