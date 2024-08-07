import AddButton from "@/components/AddButton";

export default function Tes(){
    return(<>
        <AddButton onClick={() => console.log("halo")} />
        <div className="font-normal hover:font-bold">Tes</div>
        </>
    )
}