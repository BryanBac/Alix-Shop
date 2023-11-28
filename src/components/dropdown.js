import { useEffect, useState } from 'react';
import styles from '@/styles/Dropdown.module.css'

export default function Dropdown({ options, onSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropdownBtn}>{selectedOption || 'Selecciona una opción'}</button>
            <ul className={styles.dropdownList}>
                {options.map((option) => (
                    <li key={option} onClick={() => handleSelect(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};
