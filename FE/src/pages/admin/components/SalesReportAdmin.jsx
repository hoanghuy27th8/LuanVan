import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

class SalesRepostAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.handleDataInput(this.props.dataThang)
        }
    }
    handleDataInput(data) {
        const thang = ["00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",]

        const dataProcessed = thang.map(thangloop => ({
            thang: thangloop,
            tongDoanhThu: data.some(item => item.thang.split("-")[1] === thangloop) ?
                data.find(item => item.thang.split("-")[1] === thangloop).tongDoanhThu : 0
        }));
        return dataProcessed
    }
    render() {
        const data = this.state.data;
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ResponsiveContainer width="90%" height={500}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="thang" />
                        <YAxis width={150} tickCount={400} dataKey="tongDoanhThu" tickFormatter={(item) => `${item.toLocaleString()} VNĐ`} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="tongDoanhThu"
                            name="Doanh thu bán hàng"
                            stroke="#1E73BE"
                            strokeWidth={2}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default SalesRepostAdmin