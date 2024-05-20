import React, { useState } from 'react';
import './StuffInfor.css';
import pp from './pp.png';
import PersonalInforStuff from './PersonalInforStuff';
import workInforStuff from './workInforStuff';

function StuffInfor({ UserStuffName, ShouldOpen }) {
    const [type, setType] = useState('Personal'); // Default to Personal information

    const TypeOfInformDisplay = (Type) => {
        setType(Type);
    };
  const array=<PersonalInforStuff/>
    return (
        <article id="pop" className={ShouldOpen ? "pop_open" : "pop"}>
            <section className="image">
                <img src={pp} id="image" alt="Placeholder" />
            </section>
            <nav>
                <ul>
                    <li onClick={() => TypeOfInformDisplay('Personal')} >
                        <h5>Personal Information</h5>
                    </li>
                    <li onClick={() => TypeOfInformDisplay('Work')} >
                        <h5>Work Information</h5>
                    </li>
                </ul>
            </nav>
            <section id="viewbox" className="viewbox">
                {type == 'Personal' && <PersonalInforStuff personName={UserStuffName} />}
                {type == 'Work' && <workInforStuff personName={UserStuffName}/>}
            </section>
        </article>
    );
}

export default StuffInfor;
