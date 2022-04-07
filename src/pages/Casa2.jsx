import React, { useRef } from "react";

const Casa2 = () => {
    const spanInput = useRef();
    const handleChange = () => {
        /* SI PRESIONA ENTER SE ENVIA ASÍ */
        console.log(spanInput.current.textContent);
    };
    let text =
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda dignissimos molestiae fugiat praesentium, quod necessitatibus iure alias quidem quibusdam, laboriosam recusandae quaerat accusamus laborum earum ipsam sit tenetur. Alias, commodi Molestias quaerat, vitae voluptatem maxime corporis ratione necessitatibus repudiandae alias laudantium illo temporibus! Repellendus obcaecati ut consequatur voluptates nobis laudantium, itaque magni, molestiae velit voluptatibus commodi, recusandae vitae? Ipsum, molestiae. Inventore error facilis dolor voluptas natus consectetur soluta voluptatum nisi porro et animi nemo sequi, adipisci sed saepe, exercitationem sapiente fuga ab veniam officia? Quia natus quas dolore ullam dolorum! Deleniti natus eum incidunt. Deserunt possimus obcaecati culpa blanditiis voluptate et unde, officiis voluptas nam fugit animi aspernatur, id neque veritatis sunt ab labore. Repudiandae iusto quos quibusdam illum provident";
    let palabrota =
        "123456789012345678901234567890123456789012345678901234567890";
    return (
        <div className="bg-[green]">
            aca
            <div className="flex justify-center items-center w-[200px]">
                <span
                    role="textbox"
                    id="spanInput"
                    className="bg-white outline-none block w-full min-h-[40px]"
                    contentEditable
                    ref={spanInput}
                ></span>
            </div>
            <button onClick={handleChange}>que dice</button>
            <div></div>
            <div></div>
            <div></div>
            <div className="w-[100px] h-[300px]">
                <div className="mt-10 bg-red-800">{palabrota}</div>
            </div>
        </div>
    );
};

export default Casa2;
