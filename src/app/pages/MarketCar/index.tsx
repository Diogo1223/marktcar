'use client'
import React, { useState } from 'react'
import '../MarketCar/marketcar.css'

interface IFarmMinecraft{
    id:number,
    titulo:string,
    preco:number
}

interface ICasa{
    produto:IFarmMinecraft,
    quantidade:number
}

const farm: IFarmMinecraft[] = [
    {id:1, titulo:'Farm de ferro', preco:200.00},
    {id:2, titulo:'Farm de redstone', preco:100.00},
    {id:3, titulo:'Farm de comida', preco:150.00},
    {id:4, titulo:'Farm de villager', preco:500.00},
]

const formatarPreco = (preco: number): string => preco.toFixed(2)

const MarktCarpage = () => {
 const[casaAutomatica, setcasaAutomatica] =  useState<ICasa[]>([])
 
 const handleAddFarm = (id:number) => {
    const farms = farm.find((farm: { id: number }) => farm.id === id)
    const cursoExistente = casaAutomatica.find(item => item.produto.id === id)
    

    if(cursoExistente){
        const newShoppingCurso:ICasa[] = casaAutomatica.map(item =>{
            if(item.produto.id === id) ({
                ...item,
                quantidade:item.quantidade++
            })
            return item
        })
        setcasaAutomatica(newShoppingCurso)
        return
    }

    const carItem:ICasa ={
       produto:farms!, //o ! serve para o objeto não pode estar vazio
       quantidade:1
    }

    const newShoppingCurso:ICasa[] = [...casaAutomatica, carItem]
    setcasaAutomatica(newShoppingCurso)
 }
 
 const hanleRemoveFarm = (id: Number) => {
    const Existecursoshopping = casaAutomatica.find((item) => item.produto.id === id)

    if(Existecursoshopping!.quantidade>1){
        const newShoppingCurso:ICasa[] = casaAutomatica.map(item =>{
            if(item.produto.id === id) ({
                ...item,
                quantidade:item.quantidade--
            })
            return item
        })
        setcasaAutomatica(newShoppingCurso)
        return
    }
    const newShoppingCurso:ICasa[] = casaAutomatica.filter(item => item.produto.id !== id)
    setcasaAutomatica(newShoppingCurso)
 }  

const totalCurso = casaAutomatica.reduce((total, item) => {
    return total + (item.produto.preco * item.quantidade);
},0);

const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
        printWindow.document.write('<html><head><title>Imprimir Carrinho</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Itens do Carrinho</h1>');
        printWindow.document.write('<ul>');
        casaAutomatica.forEach(item => {
            printWindow.document.write(`<li>
                Título: ${item.produto.titulo}<br>
                Preço: R$ ${formatarPreco(item.produto.preco)}<br>
                Quantidade: ${item.quantidade}<br>
                Total: R$ ${formatarPreco(item.produto.preco * item.quantidade)}
            </li>`);
        });
        printWindow.document.write('</ul>');
        printWindow.document.write('<p>Total Geral: R$ ' + formatarPreco(totalCurso) + '</p>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
};

 return (
    <div className='fullscreen-bg'>
        <h1>Curso farm minecraft</h1>
        <ul>
            {farm.map(farm => (
                <li key={farm.id}>
                <p>{farm.titulo}</p>
                <p>Preco: R$ {formatarPreco(farm.preco)}</p>
                <button onClick={() => handleAddFarm(farm.id)}>Adicionar</button>
            </li>))}
        </ul>
        <div className='titulo'>
        <h1>Carrinhos de comprara R$ {formatarPreco(totalCurso)}</h1>
        <ul className="top-right-list">
        {casaAutomatica.map((item) => (
                    <li key={item.produto.id} className="product-item">
                        <p>Titulo: {item.produto.titulo}</p>
                        <p>Preço: R${formatarPreco(item.produto.preco)}</p>
                        <p>Quantidade: {item.quantidade}</p>
                        <p>Total: R${formatarPreco(item.produto.preco * item.quantidade)}</p>
                        <button onClick={() => hanleRemoveFarm(item.produto.id)}>Remover</button>
                        <button onClick={handlePrint}>Imprimir Carrinho</button>
                    </li>
                ))}
        </ul>
        </div>
    </div>
  )
  
}

export default MarktCarpage
