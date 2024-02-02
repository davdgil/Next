let products =[  {
    nombre: "PC-Gaming",
    marca: "Asus",
    precio: 1200
},
{
    nombre: "Tablet",
    marca: "Samsung",
    precio: 300
},
{
    nombre: "Camara-Reflex",
    marca: "Canon",
    precio: 650
}
]

const getProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 3000);
    });
};

getProducts().then((result) => {
    console.log(result);
});

const fetchData = async () => {
    const result = await getProducts();
    console.log("con await\n", result);
};

fetchData();