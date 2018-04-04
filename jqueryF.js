(function(){
    
    // $ function will do 
    //    var lis = $("li"); <--- btw, when you do $("li"), you are really doing new $('li');
    //    lis[0] //-> <li>
    //    lis.length // --> 3 
    //    lis.html() // --> "Hello world"
    
    $ = function(selector){
        // if `this` is not correct
        // call new $(selector);
        if ( !(this instanceof $)) { // same as this === window
            return new $(selector);
        }
        
        
        // get elements from the page using selector
        // (using document.querySelectorAll)
        var elements = document.querySelectorAll(selector);
        // go through each element and copy to `this` as a numeric property
        // also set a length property
        // this.__proto__ === $.prototype  
        //    OR
        //this instanceof $;
        
        for (var i=0; i<elements.length; i++){
            console.log("f u");
            console.log("elements is " + elements[i]);
            this[i] = elements[i];
         }
        this.length = elements.length;
        //  ----> This code can be look like
        //[].prototype.push.apply(this,elements); // why can't I call [].push.call(this,elements);
        //Array.prototype.push.apply(this,elements);
        
    }; 
    
   
    // this copy properties in object into target
    $.extend = function(target,object){
        for ( var prop in object ) {
            if ( object.hasOwnProperty(prop)){
                target[prop] = object[prop];
            }
        } 
        return target;
    };
    
    // Static methods
    var isArrayLike = function(obj){
        if(typeof obj.length === "number"){
            if(obj.length === 0){
                return true;
            } else if (obj.length > 0){
                return (obj.length - 1) in obj;
            }
        }
        return false;
    };
    
    $.extend($,{
        isArray:   function(obj){
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        each:      function(collection,cb){
            if(isArrayLike(collection)){
                for(var i=0; i<collection.length ; i++){
                    var value = collection[i];
                    cb.call(value,i, value);
                }
            } else {  // if this is not an array.. just object
                for (var prop in collection){
                    if(collection.hasOwnProperty(prop)){
                        var value = collection[prop];
                        cb.call(value,prop, value);
                    }
                } 
            }
        },
        makeArray: function(arr){
            var array = [];
            $.each(arr,function(i,value){
                array.push(value);
            });
            return array;
        },
        
        // var speakProxy = $.proxy(dog.speak, dog); --> call dog.speak w/ dog as this
        proxy: function(fn,context){
            return function(){
                return fn.apply(context,arguments);   //arguments are built in for all arg
            }
        }
    });
    
    $.extend($.prototype,{
        
        // var $as = new $("a");
        // $as.html() //--> "Doberman"
        // $as.html("hello there");
        html: function(newHtml){
            if(arguments.length){
                // setting
                // go through each element in `this`
                // set innerHTML to newHtml
                $.each(this,function(i,el){
                    el.innerHTML = newHtml; 
                });
                return this;
            } else {
                // return this[0]' innerHTML
                return this[0] && this[0].innerHTML;
            }
            
        },
        val: function(newVal){
            if(arguments.length){
                // setting
                // go through each element in `this`
                // set innerHTML to newHtml
                $.each(this,function(i,el){
                    el.innerTEXT = newVal; 
                });
                return this;
            } else {
                // return this[0]' innerHTML
                return this[0] && this[0].innerTEXT;
            } 
            
        },
        
        text: function(newText){},
        find: function(selector){},
    })
    
})();