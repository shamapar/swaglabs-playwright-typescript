export const productNames = {
    backPack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTshirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    redTshirt: 'Test.allTheThings() T-Shirt (Red)'
}

export const productPrice = {
    SauceLabsBackpack: '$29.99',
    SauceLabsBikeLight: '$9.99',
    SauceLabsBoltTShirt: '$15.99',
    SauceLabsFleeceJacket: '$49.99',
    SauceLabsOnesie: '$7.99',
    TestallTheThingsTShirt: '$15.99'
}

export const productInventory = [
    {
        name: "Sauce Labs Backpack",
        price: "$29.99"
    },
    {
        name: "Sauce Labs Bike Light",
        price: "$9.99"
    },
    {
        name: "Sauce Labs Bolt T-Shirt",
        price: "$15.99"
    }
]


export function productPriceByName(productName: string) {
    const product = productInventory.find(item => item.name === productName);
    if (!product) throw new Error("No product found");
    return product.price;
}