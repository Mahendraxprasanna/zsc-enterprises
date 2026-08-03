import { motion, useTransform } from "framer-motion";

export default function CircularText({
    text,
    progress,
    color="#FF671F",
    radius=180
}){

    const rotate = useTransform(
        progress,
        [0,1],
        [0,360]
    );

    return(

        <motion.svg
        style={{
            position:"absolute",
            inset:0,
            width:"100%",
            height:"100%",
            rotate,
            overflow:"visible"
        }}
        viewBox="0 0 500 500"
        >

            <defs>

                <path
                id={`circle-${text.replace(/\s/g,"")}`}
                d="
                M250,250
                m -180,0
                a180,180 0 1,1 360,0
                a180,180 0 1,1 -360,0
                "
                />

            </defs>

            <text
            fill={color}
            fontSize="14"
            fontWeight="700"
            letterSpacing="8"
            >

                <textPath
                href={`#circle-${text.replace(/\s/g,"")}`}
                startOffset="0%"
                >

                    {text.repeat(12)}

                </textPath>

            </text>

        </motion.svg>

    )

}