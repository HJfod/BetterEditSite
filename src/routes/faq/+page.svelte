
<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import HomeNav from "$lib/components/HomeNav.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import Link from "$lib/components/Link.svelte";
    import Row from "$lib/components/Row.svelte";
    import Section from "$lib/components/Section.svelte";
    import SocialHead from "$lib/components/SocialHead.svelte";

</script>

<SocialHead
    title="BetterEdit FAQ"
    description="Frequently Asked Questions about the BetterEdit mod for Geometry Dash"
/>

<HomeNav/>

<h1>FAQ</h1>

<Section>
    <article id="be-not-found">
        <h2><Icon icon="help"/>BetterEdit not showing up in Geode search results</h2>
        <p>
            If BetterEdit is not showing up in Geode search results, that may be caused by a 
            few reasons:
        </p>
        <ol>
            <li>You are using MacOS; <em>BetterEdit is currently not available on Mac</em>.</li>
            <li>A new GD update has been released, and <em>BetterEdit has not yet been ported</em>.</li>
            <li>Your internet connection is down.</li>
        </ol>
        <p>
            If the problem persists, please join the <Link href="https://discord.gg/UGHDfzQtpz">BetterEdit Discord Server</Link> for support!
        </p>
    </article>

    <article id="is-be-free">
        <h2><Icon icon="help"/>Is BetterEdit Free?</h2>
        <p>
            BetterEdit is <em>free and open-source</em>! However, the mod is supported via
            <em>donations</em>, and there are plans to give donators access to extra features.
        </p>
        <p>
            The base features of the mod will always stay 100% free for everyone though <Icon icon="heart" --icon-size=1em/>
        </p>
        <Row gap="small" wrap="wrap" justify="left">
            <Button href="https://github.com/HJfod/BetterEdit" icon="github">BetterEdit Source Code</Button>
            <Button href="/support" icon="heart" style="support-filled">Support</Button>
        </Row>
    </article>

    <article id="who-made-be">
        <h2><Icon icon="help"/>Who made BetterEdit?</h2>
        <p>
            BetterEdit is made by <em>HJfod</em>, a 20-year-old university student from Finland 
            with a passion for all Geometry Dash -related things!
        </p>
        <p>
            You can message him on Discord <em>@hjfod</em>. You can also find him on other social media:
        </p>
        <Row gap="small" wrap="wrap" justify="left">
            <Button href="https://twitter.com/hjfod" icon="twitter">Twitter</Button>
            <Button href="https://youtube.com/@hjfod" icon="youtube">YouTube</Button>
            <Button href="https://ko-fi.com/hjfod" icon="kofi">Ko-Fi</Button>
        </Row>
    </article>

    <article id="is-be-official">
        <h2><Icon icon="help"/>Is BetterEdit an Official Part of GD?</h2>
        <p>
            BetterEdit is <em>fan-made</em> and <em>NOT officially endorsed</em> by RobTop Games
            (the developer of Geometry Dash).
        </p>
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

        --font-size: 1em;

        & > h2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--gap-small);
            font-size: 1.3em;

            --icon-color: color-mix(in srgb, var(--text-50) 50%, transparent);
        }
    }
</style>
