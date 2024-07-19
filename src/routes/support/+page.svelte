
<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import Button from "$lib/components/Button.svelte";
    import Row from "$lib/components/Row.svelte";
    import HomeNav from "$lib/components/HomeNav.svelte";
    import Box from "$lib/components/Box.svelte";
</script>

<HomeNav/>

<h1>Support</h1>

<Section>
    <p>
        BetterEdit takes <em>a lot of time and effort</em> to develop, so if you
        like the mod and would like to support its development, you can <em>support
        me on Ko-fi!</em>
    </p>
    <p>
        I don't have much to offer beyond my gratitude right now, but I am <em>planning
        on adding extra features</em> for Supporters in the future!
    </p>
    <p>
        By supporting BetterEdit, you are <em>also directly supporting Geode</em>, as I
        am one of its founders and lead developers <Icon icon="heart" --icon-size=1em/>
    </p>
</Section>

<Section>
    <Row gap="small" wrap="wrap">
        <Button href="https://ko-fi.com/HJfod" style="support-filled" icon="kofi">Donate on Ko-Fi</Button>
        <Button href="https://github.com/sponsors/HJfod" style="support-filled" icon="github">Sponsor on GitHub</Button>
    </Row>
</Section>

<Box>
    Please only donate if you have the money to do so. I do not want other starving students to give me their
    last pennies. <em class="alt">Take care of yourself first!</em> <Icon icon="heart" --icon-size=1em --icon-color=var(--accent-500)/>
</Box>
