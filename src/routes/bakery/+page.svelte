<script lang="ts">
    export const prerender = false;

    import Box from "$lib/components/Box.svelte";
    import Button from "$lib/components/Button.svelte";
    import Column from "$lib/components/Column.svelte";
    import Gap from "$lib/components/Gap.svelte";
    import LoadingCircle from "$lib/components/LoadingCircle.svelte";
    import Row from "$lib/components/Row.svelte";
    import Toggle from "$lib/components/Toggle.svelte";

    let donationSum: string = "";
    // @hmr:keep
    let adminToken: string = "";
    let generatedLicense: { key: string } | { status: string } | "loading" | undefined = undefined;
    
    let listNameSearch: string = "";
    let supportersListPage = 0;
    let supportersListMaxPage = 0;
    let supportersList: API["GET"]["/supporters"]["output"] | { status: string } | "loading" | undefined = undefined;
    let supporterDetails: { [id: string]: API["GET"]["/my-support"]["output"] | { status: string } | "loading" } = {};

    let keysListMadeForFilter: "anyone" | "someone" | undefined = undefined;
    let keysListUsedFilter: boolean | undefined = undefined;
    let keysListPage = 0;
    let keysListMaxPage = 0;
    let keysList: API["GET"]["/admin/license-keys"]["output"] | { status: string } | "loading" | undefined = undefined;

    type GDAccountInfo = {
        gd_account_id: number,
        username: String,
        cube_id: number,
        player_color_1: number,
        player_color_2: number,
        glow_color?: number,
    };
    interface API extends Record<string, Record<string, { input: any, output: any }>> {
        "GET": {
            "/supporters": {
                input: {
                    page: number,
                    per_page: number,
                    name?: string,
                    admin_token?: string,
                },
                output: {
                    supporters: {
                        info: GDAccountInfo,
                        supporter_tier: number,
                        supported_amount?: number,
                        activated_device_count?: number,
                        supporter_id?: string,
                        is_public?: boolean,
                    }[],
                    total_supporter_count: number,
                    total_public_supporter_count: number,
                }
            },
            "/my-support": {
                input: {
                    token: string,
                    supporter_id?: string,
                },
                output: {
                    showing_publicly: boolean,
                    supported_on: number,
                    supported_amount: number,
                    supporter_tier: number,
                    gd_info: GDAccountInfo,
                    devices: {
                        device_id: string,
                        device_name: string,
                        device_platform: "win" | "linux" | "ios" | "mac-arm" | "mac-intel" | "android32" | "android64",
                        activated_on: number,
                    }[]
                }
            },
            "/admin/license-keys": {
                input: {
                    page: number,
                    per_page: number,
                    token: string,
                    used?: boolean,
                    for_supporter?: "anyone" | "someone",
                },
                output: {
                    keys: {
                        key: string,
                        used_by?: string,
                        supported_amount: number,
                        for_supporter?: string,
                    }[],
                    total_key_count: number,
                }
            },
        }
        "POST": {
            "/admin/generate-license-key": {
                input: {
                    supported_amount: number,
                    token: string,
                },
                output: {
                    created_license_key: string,
                }
            }
            "/admin/delete-license-key": {
                input: {
                    token: string,
                    key: string,
                },
                output: {}
            }
        }
    }

    async function api<
        const M extends keyof API,
        const E extends keyof API[M]
    >(method: M, endpoint: E, params: API[M][E]["input"]): Promise<API[M][E]["output"]> {
        const url = new URL(`https://api.betteredit.pro${String(endpoint)}`);
        if (method !== "POST") {
            url.search = new URLSearchParams(
                Object.entries(params)
                    .map(([a, b]) => [a, b?.toString()])
                    .filter(([a, b]) => b !== undefined) as string[][]
            ).toString();
        }
        const result = await fetch(
            url,
            {
                method: method as string,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: method === "POST" ? JSON.stringify(params) : undefined,
            }
        );
        if (!result.ok) {
            throw result.status;
        }
        return await result.json();
    }

    async function loadSupportersList(page: number) {
        supportersList = "loading";
        supportersListPage = Math.max(Math.min(page, supportersListMaxPage), 0);
        try {
            supportersList = await api("GET", "/supporters", {
                page: supportersListPage,
                per_page: 10,
                admin_token: adminToken,
                name: listNameSearch,
            });
            supportersListMaxPage = Math.floor(supportersList.total_public_supporter_count > 0 ? (supportersList.total_public_supporter_count - 1) / 10 : 0);
        }
        catch(err: any) {
            supportersList = { status: err === 400 ? 'bad cake' : err.toString() };
        }
    }
    async function loadKeysList(page: number) {
        keysList = "loading";
        keysListPage = Math.max(Math.min(page, keysListMaxPage), 0);
        try {
            keysList = await api("GET", "/admin/license-keys", {
                page: keysListPage,
                per_page: 10,
                token: adminToken,
                used: keysListUsedFilter,
                for_supporter: keysListMadeForFilter,
            });
            keysListMaxPage = Math.floor(keysList.total_key_count > 0 ? (keysList.total_key_count - 1) / 10 : 0);
        }
        catch(err: any) {
            keysList = { status: err === 400 ? 'bad cake' : err.toString() };
        }
    }
    async function viewSupporter(id: string) {
        supporterDetails[id] = "loading";
        try {
            supporterDetails[id] = await api("GET", "/my-support", {
                token: adminToken,
                supporter_id: id,
            });
        }
        catch(err: any) {
            supporterDetails[id] = { status: err === 400 ? 'Bad Request' : err.toString() };
        }
    }
    async function newLicense() {
        generatedLicense = "loading";
        try {
            const json = await api("POST", "/admin/generate-license-key", {
                supported_amount: parseInt(donationSum),
                token: adminToken,
            });
            generatedLicense = { key: json.created_license_key };
        }
        catch(err: any) {
            generatedLicense = { status: err === 400 ? 'Bad Request' : err.toString() }
        }
    }
    async function deleteLicense(key: string, evTarget: EventTarget | null) {
        const target = evTarget as HTMLElement;
        target.innerHTML = "Deleting";
        try {
            const json = await api("POST", "/admin/delete-license-key", {
                token: adminToken,
                key: key,
            });
            target.innerHTML = "Deleted";
            await loadKeysList(0);
        }
        catch(err: any) {
            target.innerHTML = `Failed to delete: ${err.toString()}`;
        }
    }
    async function copy(text: string, evTarget: EventTarget | null) {
        const target = evTarget as HTMLElement;
        try {
            await navigator.clipboard.writeText(text);
            target.innerHTML = "Copied";
        }
        catch(err: any) {
            target.innerHTML = "Failed :(";
        }
        await new Promise(resolve => setTimeout(resolve, 1500));
        target.innerHTML = "Copy";
    }

    function translateSupporter(mySupport: API["GET"]["/my-support"]["output"], id: string): API["GET"]["/supporters"]["output"]["supporters"][0] {
        return {
            info: mySupport.gd_info,
            supporter_id: id,
            ...mySupport
        };
    }
</script>

<h1>tasty cake bakery mmm</h1>

<input bind:value={adminToken} placeholder="bakery owner">

<Box>
    <h3>Baking</h3>
    <Column align="left" gap="small">
        <input bind:value={donationSum} placeholder="vegan eggs">

        {#if generatedLicense !== undefined}
            {#if generatedLicense === "loading"}
                <LoadingCircle/>
            {:else if "status" in generatedLicense}
                <p>{generatedLicense.status}</p>
            {:else}
                <code>{generatedLicense.key}</code>
            {/if}
        {/if}

        <Row>
            <Button on:click={newLicense} disabled={donationSum.length === 0}>bake</Button>
            <Button
                on:click={ev => {
                    if (generatedLicense instanceof Object && "key" in generatedLicense) {
                        copy(generatedLicense.key, ev.target);
                    }
                }}
                disabled={!(generatedLicense instanceof Object && "key" in generatedLicense)}
            >Copy</Button>
        </Row>
    </Column>
</Box>

<Gap size="large" />

<h2>cakes</h2>

{#snippet supporterBox(supporter: API["GET"]["/supporters"]["output"]["supporters"][0])}
    <Box>
        <Row justify="between">
            <Column align="left" gap="tiny">
                <p><em>{supporter.info.username}</em> <span class="gray">({(supporter.is_public ?? true) ? "public" : "private"})</span></p>
                <p class="gray">{supporter.supporter_id ?? "unknown"}</p>
                <p>Donation: <em class="alt">{(supporter.supported_amount ?? 0) / 100}€</em> (Tier {supporter.supporter_tier})</p>
                <p>Devices: <em class="alt">{supporter.activated_device_count ?? "unknown"}</em></p>
            </Column>
            {#if supporter.supporter_id}
                <Button on:click={() => {viewSupporter(supporter.supporter_id ?? "")}}>More</Button>
            {/if}
        </Row>
        {#if supporter.supporter_id && supporter.supporter_id in supporterDetails}
            {@const details = supporterDetails[supporter.supporter_id]}
            {#if details === "loading"}
                <LoadingCircle />
            {:else if "status" in details}
                <p>Error: {details.status}</p>
            {:else}
                <Column align="left" gap="tiny">
                    <p>Supported on: <em class="alt">{new Date(details.supported_on * 1000).toDateString()}</em></p>
                    <Gap size="small" />
                    <h3>Devices</h3>
                    {#each details.devices as device}
                        <p>
                            Platform: <em class="alt">{device.device_platform}</em>, 
                            ID: <span class="gray">{device.device_id}</span>
                        </p>
                    {/each}
                </Column>
            {/if}
        {/if}
    </Box>
{/snippet}

{#if keysList === undefined}
    <Button on:click={() => loadKeysList(0)}>find cakes</Button>
{:else}
    {#if keysList === "loading"}
        <LoadingCircle/>
    {:else if "status" in keysList}
        <p>{keysList.status}</p>
        <Button on:click={() => loadKeysList(0)}>find better cakes</Button>
    {:else}
        <Row gap="small">
            <Toggle
                icon="filter-clear"
                outsideState={true}
                selected={keysListMadeForFilter === undefined}
                on:select={() => {
                    keysListMadeForFilter = undefined;
                    loadKeysList(0);
                }}
                >All</Toggle>
            <Toggle
                icon="filter"
                outsideState={true}
                selected={keysListMadeForFilter === "anyone"}
                on:select={() => {
                    keysListMadeForFilter = "anyone";
                    loadKeysList(0);
                }}
                >'Anyone can use' Only</Toggle>
            <Toggle
                icon="filter"
                outsideState={true}
                selected={keysListMadeForFilter === "someone"}
                on:select={() => {
                    keysListMadeForFilter = "someone";
                    loadKeysList(0);
                }}
            >'Made for' Only</Toggle>
        </Row>

        <Row gap="small">
            <Toggle
                icon="filter-clear"
                outsideState={true}
                selected={keysListUsedFilter === undefined}
                on:select={() => {
                    keysListUsedFilter = undefined;
                    loadKeysList(0);
                }}
                style="secondary"
                >All</Toggle>
            <Toggle
                icon="filter"
                outsideState={true}
                selected={keysListUsedFilter === true}
                on:select={() => {
                    keysListUsedFilter = true;
                    loadKeysList(0);
                }}
                style="secondary"
                >Used</Toggle>
            <Toggle
                icon="filter"
                outsideState={true}
                selected={keysListUsedFilter === false}
                on:select={() => {
                    keysListUsedFilter = false;
                    loadKeysList(0);
                }}
                style="secondary"
            >Not Used</Toggle>
        </Row>

        <Row>
            <p>cakes: {keysList.total_key_count}</p>
            <Button on:click={() => loadKeysList(0)} disabled={keysListPage == 0}>&lt;&lt;</Button>
            <Button on:click={() => loadKeysList(keysListPage - 1)} disabled={keysListPage == 0}>&lt;</Button>
            <p>page: {keysListPage + 1}/{keysListMaxPage + 1}</p>
            <Button on:click={() => loadKeysList(keysListPage + 1)} disabled={keysListPage == keysListMaxPage}>&gt;</Button>
            <Button on:click={() => loadKeysList(keysListMaxPage)} disabled={keysListPage == keysListMaxPage}>&gt;&gt;</Button>
        </Row>

        <div class="cakes">
            {#each keysList.keys as key}
                <Box>
                    <Column align="left" gap="tiny">
                        <code>{key.key.match(/.{4}/g)?.join("-")}</code>
                        <p>Amount: <em class="alt">{key.supported_amount / 100}€</em></p>
                        {#if key.used_by}
                            <em>Used by {key.used_by}</em>
                        {:else}
                            <p class="gray">Not used</p>
                        {/if}
                        {#if key.for_supporter}
                            <em>Made for {key.for_supporter}</em>
                        {:else}
                            <p class="gray">Anyone can use</p>
                        {/if}
                        <Gap size="small" />
                        {@const supporterID = key.used_by ?? key.for_supporter ?? ""}
                        <Row gap="small">
                            <Button on:click={ev => copy(key.key, ev.target)} disabled={!!key.used_by}>Copy</Button>
                            <Button on:click={ev => deleteLicense(key.key, ev.target)} disabled={!!key.used_by}>Delete</Button>
                            <Button
                                on:click={() => viewSupporter(key.used_by ?? key.for_supporter ?? "")}
                                disabled={!supporterID}
                            >Who?</Button>
                        </Row>
                        {#if supporterID && supporterDetails[supporterID] !== undefined}
                            <Gap size="small" />
                            {#if supporterDetails[supporterID] === "loading"}
                                <LoadingCircle />
                            {:else}
                                {#if "status" in supporterDetails[supporterID]}
                                    <p>{supporterDetails[supporterID].status}</p>
                                {:else}
                                    {@render supporterBox(translateSupporter(supporterDetails[supporterID], supporterID))}
                                {/if}
                            {/if}
                        {/if}
                    </Column>
                </Box>
            {/each}
        </div>
    {/if}
{/if}

<Gap size="large" />

<h2>bakers</h2>

{#if supportersList === undefined}
    <Button on:click={() => loadSupportersList(0)}>find bakers</Button>
{:else}
    {#if supportersList === "loading"}
        <LoadingCircle/>
    {:else if "status" in supportersList}
        <p>{supportersList.status}</p>
        <Button on:click={() => loadSupportersList(0)}>find better bakers</Button>
    {:else}
        <Row>
            <input bind:value={listNameSearch} placeholder="hot bakers in ur area">
            <Button on:click={() => loadSupportersList(0)}>match me</Button>
        </Row>
        <Row>
            <p>bakers: {supportersList.total_public_supporter_count}/{supportersList.total_supporter_count}</p>
            <Button on:click={() => loadSupportersList(0)} disabled={supportersListPage == 0}>&lt;&lt;</Button>
            <Button on:click={() => loadSupportersList(supportersListPage - 1)} disabled={supportersListPage == 0}>&lt;</Button>
            <p>page: {supportersListPage + 1}/{supportersListMaxPage + 1}</p>
            <Button on:click={() => loadSupportersList(supportersListPage + 1)} disabled={supportersListPage == supportersListMaxPage}>&gt;</Button>
            <Button on:click={() => loadSupportersList(supportersListMaxPage)} disabled={supportersListPage == supportersListMaxPage}>&gt;&gt;</Button>
        </Row>
        <div class="cakes">
            {#each supportersList.supporters as supporter}
                {@render supporterBox(supporter)}
            {/each}
        </div>
    {/if}    
{/if}

<style lang="scss">
    .cakes {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 500px);
        gap: .5rem;
    }
</style>
