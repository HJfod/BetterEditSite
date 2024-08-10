<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import LoadingCircle from "$lib/components/LoadingCircle.svelte";

    let eggCount: string;
    let cakeName: string;
    let resultP: HTMLParagraphElement;
    let loading = false;

    async function bake() {
        try {
            loading = true;
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
            if (!result.ok) {
                throw result.status;
            }
            const json = await result.json() as {
                created_license_key: string,
            };
            loading = false;
            resultP.innerHTML = json.created_license_key;
        }
        catch(err: any) {
            loading = false;
            resultP.innerHTML = err === 400 ? 'bad cake' : err.toString();
        }
    }
</script>

<h1>tasty cake bakery mmm</h1>

<p>how many vegan eggs do u want in the cake</p>
<input bind:value={eggCount}>

<p>whats the name of the cake</p>
<input bind:value={cakeName}>

{#if loading}
    <LoadingCircle/>
{/if}
<p bind:this={resultP} style={loading ? "display: none;" : ""}></p>

<Button on:click={bake}>bake the cake</Button>
