'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getProvinces } from 'vietnam-provinces';

export type SelectProvinceValue = {
    label: string;
    value: string;
}

interface SelectProvinceProps {
    value?: SelectProvinceValue;
    onChange: (value: SelectProvinceValue) => void;
}

const SelectProvince: React.FC<SelectProvinceProps> = ({
    value,
    onChange
}) => {
    const [provinces, setProvinces] = useState<SelectProvinceValue[]>([]);

    useEffect(() => {
        const provincesData = getProvinces().map(province => ({
            label: province.name,
            value: province.id
        }));
        setProvinces(provincesData);
    }, []);

    return (
        <Select
            isClearable
            placeholder="Select Province"
            options={provinces}
            value={value}
            onChange={(value) => onChange(value as SelectProvinceValue)}
        />
    );
}

export default SelectProvince;
