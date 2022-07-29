import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <>
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <div className="text-jumbotron">
                            <h2>Discount akhir tahun hingga 15%</h2>
                            <h1 className="display-3">Hanya di TokoKita</h1>
                            <p className="lead mb-4">Kami Selalu mengedankan kualitas dengan harga yang terjangkau.produk yang kami jual
                                dijamin
                                keaslian-nya.
                            </p>
                            <Link href={`/product`}>
                                <a className="btn-jumbotron mt-2">produk kami</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero