import { PieChart } from '@mui/x-charts/PieChart';

function Results({dairy, gluten, peanuts}) {

    return(
        <div height={500} display={"flex"}>
            <PieChart skipAnimation id='1'
            series={[
                {
                    data: [
                        { id: 0, value: dairy, color: "white", label: `Dairy: ${dairy*10}% Risk`},
                        { id: 0, value: 10-dairy, color: "transparent"}
                        
                    ],
                    fill: 'white',
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 10,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                },
            ]}
                slotProps={{
                    legend: {
                        labelStyle: {
                            fontSize: 14,
                            fill: 'white',
                        },
                    },
                }}
            width={400}
            height={500}
            
        />
            <PieChart skipAnimation id='2'
                series={[
                    {
                        data: [
                            { id: 0, value: gluten, color: "brown", label: `Gluten: ${gluten * 10}% Risk` },
                            { id: 0, value: 10 - gluten , color: "transparent" }

                        ],
                        fill: 'white',
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 10,
                        cornerRadius: 5,
                        startAngle: 0,
                        endAngle: 360,
                        cx: 150,
                        cy: 150,
                    },
                ]}
                slotProps={{
                    legend: {
                        labelStyle: {
                            fontSize: 14,
                            fill: 'white',
                        },
                    },
                }}
                width={400}
                height={500}

            />
            <PieChart skipAnimation id='3'
                series={[
                    {
                        data: [
                            { id: 0, value: peanuts, color: "orange", label: `Peanuts : ${peanuts * 10}% Risk` },
                            { id: 0, value: 10 -  peanuts , color: "transparent" }

                        ],
                        fill: 'white',
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 10,
                        cornerRadius: 5,
                        startAngle: 0,
                        endAngle: 360,
                        cx: 150,
                        cy: 150,
                    },
                ]}
                slotProps={{
                    legend: {
                        labelStyle: {
                            fontSize: 14,
                            fill: 'white',
                        },
                    },
                }}
                width={400}
                height={500}

            />
        </div>
    );

}
export default Results