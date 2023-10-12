const load = async () => {
    if (!localStorage.getItem("player_id")) {
        try {
            const response = await fetch("/player_ids", {
                method: "POST",
                headers: {"Accept": "application/json","Content-Type": "application/json"},
                body: JSON.stringify({name: "test"})
            });

            console.log(response)
            console.log(await response.json())
        } catch (error) {
            console.error(error);
        }
    }
}

load();