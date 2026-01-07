"use client";

import { Form, Input } from "antd";
import Image from "next/image";

type InputsProps = {
    setResult: React.Dispatch<
        React.SetStateAction<{
            monthly: string;
            total: string;
        } | null>
    >;
};

interface Values {
    amount: number;
    term: number;
    rate: number;
}

export default function Inputs({ setResult }: InputsProps) {
    const [form] = Form.useForm();

    const formatCurrency = (value: number) => {
        return value.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
        });
    };

    const onFinish = (values: Values) => {
        const amount = Number(values.amount);
        const term = Number(values.term);
        const rate = Number(values.rate);

        const monthlyRate = rate / 100 / 12;
        const months = term * 12;

        const monthly =
            (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

        const total = monthly * months;

        setResult({
            monthly: formatCurrency(monthly),
            total: formatCurrency(total),
        });
    };

    return (
        <section className='w-full md:w-1/2 bg-white p-6 md:p-8'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-xl font-bold text-slate-900'>
                    Mortgage Calculator
                </h1>
                <button
                    onClick={() => form.resetFields()}
                    className='text-slate-500 underline input-button'
                >
                    Clear All
                </button>
            </div>

            <Form form={form} layout='vertical' onFinish={onFinish}>
                {/* Mortgage Amount */}
                <Form.Item
                    label='Mortgage Amount'
                    name='amount'
                    rules={[
                        { required: true, message: "This field is required" },
                        {
                            validator: (_, value) =>
                                value > 0
                                    ? Promise.resolve()
                                    : Promise.reject("Must be greater than 0"),
                        },
                    ]}
                >
                    <div className='mortgage-input'>
                        <span className='prefix'>£</span>
                        <Input type='number' className='mortgage-field' />
                    </div>
                </Form.Item>

                {/* Term + Rate */}
                <div className='flex gap-x-2'>
                    <Form.Item
                        label='Mortgage Term'
                        name='term'
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <div className='mortgage-input'>
                            <Input type='number' className='mortgage-field' />
                            <span className='prefix'>years</span>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label='Interest Rate'
                        name='rate'
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <div className='mortgage-input'>
                            <Input type='number' className='mortgage-field' />
                            <span className='prefix'>%</span>
                        </div>
                    </Form.Item>
                </div>

                {/* Mortgage Type */}
                <Form.Item
                    label='Mortgage Type'
                    name='mortgageType'
                    rules={[
                        {
                            validator: (_, value) =>
                                value?.length
                                    ? Promise.resolve()
                                    : Promise.reject("This field is required"),
                        },
                    ]}
                >
                    <div className='space-y-3'>
                        <label className='mortgage-type'>
                            <input type='checkbox' value='repayment' />
                            <span className='radio-custom'></span>
                            <span className='font-semibold'>Repayment</span>
                        </label>

                        <label className='mortgage-type'>
                            <input type='checkbox' value='interestOnly' />
                            <span className='radio-custom'></span>
                            <span className='font-semibold'>Interest Only</span>
                        </label>
                    </div>
                </Form.Item>

                {/* Submit */}
                <button
                    type='submit'
                    className='mortgage-button mt-6 mx-auto flex items-center justify-center gap-x-2'
                >
                    <Image
                        src='/images/icon-calculator.svg'
                        alt='calculator'
                        width={20}
                        height={20}
                    />
                    Calculate Repayments
                </button>
            </Form>
        </section>
    );
}
