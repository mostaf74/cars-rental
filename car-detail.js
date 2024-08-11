const cars = [{ name: "Toyota Corolla" ,price: 29,id: 1,year: 2018 }
    , { name:"BMW X5", price:55,year:2021 }
]
    
var c= document.getElementById("cars");

for(let x of cars){
    c.innerHTML=`<h1>name:${x.name} </h1><p> price </p>`


}
