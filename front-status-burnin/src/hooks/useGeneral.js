export const useGeneral = () => {
    const onKeyShift = (e) => {
        if (e.key === "Tab" || e.key === "Enter") return;
        if (
            e.key === "-" ||
            e.key === "e" ||
            e.key === "+" ||
            e.key === "." ||
            e.key < "1" ||
            e.key > "3"
        ) {
            e.preventDefault();
        }
    }

    const onInputShift = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value < 1 || value > 3) {
            e.target.value = "";
        }
    }

    const onKeyQty = (e) => {
        if (e.key === "Tab" || e.key === "Enter") return;
        if (
            e.key === "-" ||
            e.key === "e" ||
            e.key === "+" ||
            e.key === "." ||
            e.key < "0"
        ) {
            e.preventDefault();
        }
    }

    const onInputQty = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value < 0) {
            e.target.value = "";
        }
    }


    const onKeyName = (e) => {
        const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
            " ",
        ];
        if (
            !e.key.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ.]/) &&
            !allowedKeys.includes(e.key)
        ) {
            e.preventDefault();
        }
    }

    const onInputName = (e) => {
        e.target.value = e.target.value.replace(
            /[^a-zA-ZáéíóúÁÉÍÓÚñÑ. ]/g,
            ""
        );
    }

    const onKeyNumEm = (e) => {
        const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
        ];
        if (!e.key.match(/[0-9]/) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    }

    const onInputNumEm = (e) => {
        e.target.value = e.target.value
            .replace(/[^0-9]/g, "")
            .slice(0, 7);
    }

    return {
        onKeyShift,
        onInputShift,
        onKeyName,
        onInputName,
        onKeyNumEm,
        onInputNumEm,
        onKeyQty,
        onInputQty,

    }
}




