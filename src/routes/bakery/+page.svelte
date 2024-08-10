<script lang="ts">
    import Button from "$lib/components/Button.svelte";

    let eggCount: string;
    let cakeName: string;
    let resultP: HTMLParagraphElement;
</script>

<h1>tasty cake bakery mmm</h1>

<p>how many vegan eggs do u want in the cake</p>
<input bind:value={eggCount}>

<p>whats the name of the cake</p>
<input bind:value={cakeName}>

<p bind:this={resultP}></p>

<Button on:click={async () => {
    try {
        const result = await fetch(
            "https://api.betteredit.pro/new-license",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    supported_amount: parseInt(eggCount),
                    token: cakeName,
                }),
            }
        );
        const json = await result.json();
        if (json.created_license_key) {
            resultP.innerHTML = json.created_license_key;
        }
        else throw json.toString();
    }
    catch(err) {
        resultP.innerHTML = `bad cake: ${err}`;
    }
}}>bake the cake</Button>
