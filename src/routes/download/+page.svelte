<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import Section from "$lib/components/Section.svelte";
    import Image from "$lib/components/Image.svelte";
    import Gap from "$lib/components/Gap.svelte";
    import searchInGeode from "$lib/assets/search-in-geode.png?enhanced";
    import HomeNav from "$lib/components/HomeNav.svelte";
    import Row from "$lib/components/Row.svelte";
    import SocialHead from "$lib/components/SocialHead.svelte";
</script>

<SocialHead
    title="Download BetterEdit"
    description="Instructions for Downloading & Installing BetterEdit for Geode"
/>

<HomeNav/>

<Section>
    <h1>Download</h1>
</Section>

<Section>
    <p>
        Follow these instructions to <em>install BetterEdit</em> for the Geode Mod Loader.
    </p>
    <p>
        BetterEdit is available on <em>Windows</em> and <em>Android</em>.
    </p>
</Section>

<Gap size="small"/>

<Section>
    <article>
        <h2><Icon icon="one"/>Install Geode</h2>
        <p>
            Install the <em>Geode Mod Loader</em> for Geometry Dash. You will find 
            the download links & the installation instructions on the Geode website.
            Please note that while Geode is available on MacOS, BetterEdit is not.
        </p>
        <Button style="primary-filled" href="https://geode-sdk.org/install" icon="link">Install Geode</Button>
    </article>

    <article>
        <h2><Icon icon="two"/>Install BetterEdit</h2>
        <p>
            After installing <em>Geode</em>, go to the Geode tab in-game and
            <em>search for BetterEdit</em> in the Downloads tab. Select <em>View</em>
            and then <em>Install</em> to install the mod.
        </p>
        <Image
            src={searchInGeode}
            alt="The Geode tab open in Geometry Dash, showing the search results for the 
            'BetterEdit' search query, which comes up with one result for the BetterEdit mod."
        />
        <Button href="/faq#be-not-found" icon="help">I can't find BetterEdit!</Button>
    </article>

    <article>
        <h2><Icon icon="three"/>Need Help?</h2>
        <p>
            Need help with the installation process? Join the <em>BetterEdit Discord Server</em> 
            to get support with installing & using the mod!
        </p>
        <Row gap="small">
            <Button href="https://discord.gg/UGHDfzQtpz" icon="discord">Join the Discord</Button>
            <Button href="/faq" icon="help">FAQ</Button>
        </Row>
    </article>
</Section>

<style lang="scss">
    article {
        background-color: color-mix(in srgb, var(--background-300) 15%, transparent);
        border-radius: .5rem;
        padding: 1.5rem;

        display: flex;
        flex-direction: column;
        align-items: start;
        gap: var(--gap-small);

        & > h2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--gap-small);

            --icon-color: var(--primary-300);
        }
    }
</style>
