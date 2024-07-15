import Link from "next/link";
import { useState } from "react";

export default function RegisterHero({ block, dataBinding }) {
    const [phoneInputValue, setPhoneInputValue] = useState('');
    const [textInputValue, setTextInputValue] = useState(`
        Persyaratan Join Seleksi Batch 

Ktp ( Foto ) 
Foto Selfie
Foto Selfie Pegang KTP
tb / bb
pekerjaan saat ini
pendidikan terakhir
Email
No hp
Nama lengkap mama kandung 

Foto Buku tabungan halaman depan / mutasi rekening share(screenshoot pojok kiri atas yg ada nama & nomor rekening)

instal AAJI EXAM daftar, upload ktp & selfie & Kirim bukti daftar Screenshoot nya

Trf 235 rb ke 
217 309 7778 a/n Allianz Life Ind

Trf 138 rb ke 
006 200 0005 a/n Allianz Life Syariah`);

    return (
        <section className="contact" data-cms-bind={dataBinding}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 me-auto order-2 order-lg-1">
                        <div className="contact-form-Information">
                            <div className="address">
                                { block.address && 
                                    <>
                                    <h3>{block.address.heading }</h3>
                                    <p>{block.address.address }</p>
                                    </>
                                } 
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2">
                        <div className="contact-form">

                            { block.form && 
                                <>
                                    <form >
                                        <h3>{block.form.heading }</h3>  
                                        <>
                                            <div className="col-md-12">
                                                <label for="phone-number" className="label">{block.form.phone_number.heading}</label>
                                                <input
                                                    type="tel"
                                                    value={phoneInputValue}
                                                    onChange={(e)=> setPhoneInputValue(e.target.value)}
                                                    className="form-control"
                                                    id="phone-number"
                                                    name="phone-number"
                                                    placeholder={block.form.phone_number.placeholder}
                                                    required=""
                                                />
                                            </div>
                                        </> 
                                        <input type="text" name="_gotcha" style={{display: 'none'}} />

                                        { block.form.submit_button && 
                                            <div className="col-12">
                                                {/* <button className="btn btn-primary btn-lg mt-7"> */}
                                                    <Link className="btn btn-primary btn-lg mt-7" href={`https://api.whatsapp.com/send?phone=${phoneInputValue}&text=${textInputValue}`}>
                                                        <span className="position-relative">{block.form.submit_button.text }</span> 
                                                    </Link>
                                                {/* </button>  */}
                                            </div>
                                        }
                                    </form>
                                </>
                            }
                            <div className="effect"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}