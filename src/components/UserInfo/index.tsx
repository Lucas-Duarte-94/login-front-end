import { FormEvent, useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { AiOutlineCamera } from 'react-icons/ai'
import './style.scss';

// interface FileProps {
//     target?: {
//         value: FileList;
//     }
    
    
// }

export function UserInfo() {
    const { checkToken, addProfileAvatar, updateInfo } = useLogin();
    const [image, setImage] = useState<string>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [bday, setBday] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    let fd = new FormData();

    useEffect(() => {
        const res = checkToken();
        res.then(r => {
            if(r) {
                setImage(r.data.avatarURL);
                setFirstName(r.data.firstName);
                setLastName(r.data.lastName);
                setBday(r.data.birthDay);
                setPhoneNum(r.data.phone);
                setAddress(r.data.address);
                setCity(r.data.city);
                setState(r.data.state);
            }
        })
        
    }, [])

    async function handleImageSubmit() {
        let img = await addProfileAvatar(fd);

        if(img) {
            setImage(img)
        }else {
            console.log(img)
        }
    }

    function submitForm(event: FormEvent) {
        event.preventDefault()
        const dados = {firstName, lastName, bday, phoneNum, address, state, city}

        updateInfo(dados);
    }

    // function teste(val: string) {
    //     let phoneMask = "(  )     -    ";
    //     let formattedPhoneNum = '';
    //     if(phoneNum) {
    //         // phoneNum.
    //         formattedPhoneNum = phoneNum.replace(' ', val);
    //     }else {
    //         formattedPhoneNum = phoneMask.replace(' ', val);
    //     }
        
    //     console.log(val)
    //     // if(phoneNum) {
    //     //     for(let i = 0; i < phoneNum.length; i++) {
    //     //         phoneMask.replace('x', phoneNum[i])
    //     //         console.log(phoneNum[i])
    //     //     }
    //     //     formattedPhoneNum = phoneMask;
    //     // }
    //     setPhoneNum(formattedPhoneNum);
    // }

    return (
        <div className="content">
            <h1>Insira seus dados</h1>
            <form method="POST" onSubmit={submitForm}>
                <div className="basic_infos">
                    <div className={image ? "image border_none"  : "image"}>
                        {image ? 
                            <div>
                                <img src={image} alt=""  className="img_size"/>
                            </div>
                            :
                            <>
                                <span className="file_upload_text">
                                    Alterar imagem
                                </span>
                                <AiOutlineCamera className="icon"/>
                                <input type="file" className="file_area" accept="image/png, image/jpeg" onChange={event  => {
                                    if(event.target.files) {
                                        fd.append('avatar', event.target.files[0])
                                    }
                                    handleImageSubmit()
                                }} />
                            </>
                        }
                    </div>
                    <div className="infos">
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Digite seu nome" />
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Digite seu sobrenome" />
                        {/* <div>
                            <input type="number" name="day" id="" max='31' min="01" />
                        </div> */}
                        <input type="date" name="birthday date" value={bday} onChange={e => setBday(e.target.value)} placeholder="Data de nascimento"/>
                        <input type="text" name="phone_number" value={phoneNum} onChange={e => setPhoneNum(e.target.value)} placeholder="Telefone" />
                    </div>
                </div>
                
                <div className="state-city">
                    <input type="text" name="state" value={state} onChange={e => setState(e.target.value)} placeholder="Digite seu estado" />
                    <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} placeholder="Digite sua cidade" />        
                </div>

                <div className="address">
                    <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Digite seu endereço" />
                </div>

                <button type="submit" className="submit_button">Enviar</button>

            </form>
        </div>
    )
}