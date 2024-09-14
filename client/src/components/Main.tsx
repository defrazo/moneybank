import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';

const Main: React.FC = () => {
    const [sum, setSum] = useState<number>(() => {
        const savedSum = localStorage.getItem('sum');
        return savedSum ? JSON.parse(savedSum) : 0;
    });

    const numbers = Array.from({ length: 100 }, (_, index) => (index + 1) * 10);
    const rows = Array.from({ length: 10 }, (_, rowIndex) =>
        numbers.slice(rowIndex * 10, rowIndex * 10 + 10)
    );

    const [selectedCell, setSelectedCell] = useState<number[]>(() => {
        const savedValues = localStorage.getItem('selectedValues');
        return savedValues ? JSON.parse(savedValues) : [];
    });

    useEffect(() => {
        localStorage.setItem('selectedValues', JSON.stringify(selectedCell));
        localStorage.setItem('sum', JSON.stringify(sum));
    }, [selectedCell]);

    const handleCellClick = (value: number) => {
        setSelectedCell(prevValues => {
            const isSelected = prevValues.includes(value);

            if (isSelected) {
                const updatedValues = prevValues.filter(v => v !== value);
                setSum(updatedValues.reduce((acc, curr) => acc + curr, 0));
                return updatedValues;
            } else {
                const updatedValues = [...prevValues, value];
                setSum(updatedValues.reduce((acc, curr) => acc + curr, 0));
                return updatedValues;
            }
        })
    };


    return (
        <div className={styles["main-container"]}>
            <h1>В копилочке {sum} рублей</h1>
            <table>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((number, colIndex) => (
                                <td
                                    className={`${styles.cell} ${selectedCell.includes(number) ? styles.selected : ''}`}
                                    key={colIndex}
                                    onClick={() => handleCellClick(number)}
                                >{number}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Main;