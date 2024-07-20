
<script lang="ts">
    import beLogo from "$lib/assets/logo.svg?raw";
    import Button from "$lib/components/Button.svelte";
    import Column from "$lib/components/Column.svelte";
    import Row from "$lib/components/Row.svelte";
    import Gallery from "$lib/components/Gallery.svelte";
    import Gap from "$lib/components/Gap.svelte";
    import Card from "$lib/components/Card.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import Box from "$lib/components/Box.svelte";
    import Section from "$lib/components/Section.svelte";
    import SocialHead from "$lib/components/SocialHead.svelte";

    import HJfodPFP from "$lib/assets/pfps/hjfod.png?enhanced";
    import AlkPFP from "$lib/assets/pfps/alk.png?enhanced";
    import CairoXPFP from "$lib/assets/pfps/cairox.jpg?enhanced";
    import McresPFP from "$lib/assets/pfps/mcres.jpg?enhanced";
    import BianoxPFP from "$lib/assets/pfps/bianox.jpg?enhanced";

    const screenshots = Object.values(import.meta.glob(
        "$lib/assets/screenshot-*.png",
        {
            eager: true,
            import: "default",
            query: { enhanced: true }
        }
    )) as string[];
</script>

<SocialHead
    title="BetterEdit - Geometry Dash Editor Mod"
    description="The official website for BetterEdit - a Mod that makes the Geometry Dash Editor, well, Better"
/>

<div class="title-and-screenshots">
    <div class="title-column">
        <div class="title">
            <div class="betteredit-logo">{@html beLogo}</div>
            <h1><em>Better</em>Edit</h1>
        </div>

        <h3>A Mod that makes the <em>Geometry Dash Editor</em>, well, <em class="alt">Better</em>.</h3>

        <Row gap="small" wrap="wrap" justify="left">
            <Button icon="down-arrow" href="#about">What is BetterEdit?</Button>
            <Button icon="download" href="/download" style="primary-filled">Install for Geode</Button>
            <Button icon="heart" href="/support" style="support-filled">Support</Button>
        </Row>
    </div>
    <Gallery title="Feature Showcase" images={screenshots} />
</div>

<span id="about"/>

<Gap size="normal"/>

<Section>
    <p>
        <em>BetterEdit</em> is a mod for Geometry Dash that improves the Editor in 
        various ways, such as <em class="alt">improved Popup interfaces</em>, <em class="alt">bugfixes</em>, and lots 
        of <em class="alt">Quality-of-Life</em> changes.
    </p>
    <p>
        BetterEdit is developed by <em>HJfod</em>, a 20-year-old university student from Finland.
    </p>
</Section>

<span id="features"/>

<Gap size="small"/>

<h2>Feature list</h2>
<div class="feature-list">
    <Card title="Grid Size Controls">
        Customize the size of the Grid using simple buttons or keybinds
    </Card>
    <Card title="Better Color Selection">
        Improved color selection menu, showing <em>Color Previews</em>, all available <em>Special Channels</em>,
        and a <em>Recent Colors</em> list!
    </Card>
    <Card title="Improved Zooming">
        Zoom using <em>Control + Scroll Wheel</em>, or <em>Pinch-to-Zoom</em> on mobile!
    </Card>
    <Card title="Customizable Keybinds">
        Customizable keybinds for nearly everything in the editor thanks to the <em>Custom Keybinds</em> mod!
    </Card>
    <Card title="Edit UI Scale">
        Is the editor feeling too cluttered for you? You can <em>customize the scale of the UI</em>, 
        making buttons smaller for more convenient PC usage!
    </Card>
    <Card title="Faster Saving">
        BetterEdit improves level saving speeds by a ton, as well as adding <em>auto-save</em>
        to make data loss a thing of the past!
    </Card>
    <Card title="View Tab">
        Quickly toggle the visibility of various elements, such as 
        <em>Preview Mode</em>, <em>Trigger Lines</em> and more!
    </Card>
    <Card title="And more!">
        This is just a quick list; BetterEdit has lots more features 
        geared towards creators, such as <em>bugfixes</em>, 
        <em>Quality-of-Life improvements</em> and more!
    </Card>
</div>

<span id="testimonials"/>

<Gap size="small"/>

<h2>Beloved by Creators</h2>
<Section>
    <p>
        BetterEdit is beloved by many creators in the GD community, from <em>megacollab part
        makers</em> to people <em>crafting whole solo levels</em>.
    </p>
    <p>
        One of the major goals with BetterEdit is to have it be so good that <em>once you use it, you can't go back</em>.
        Which does make people really annoyed when GD updates and the mod goes down for a while.
    </p>
</Section>
<div class="testimonial-list">
    <!-- <Card title="HJfod" pfp={HJfodPFP} role="Developer of BetterEdit">
        I used to build levels myself for years and BetterEdit is everything I would've wanted back then
    </Card> -->
    <Card title="BIANOX" pfp={BianoxPFP} role="Creator of CYCLONE, Host of Zodiac">
        9/10, It's an extremely useful mod for both new and experienced creators. I really like it and I use it all the time
    </Card>
    <Card title="Alk" pfp={AlkPFP} role="Developer of EditorCollab">
        <span class="alk-review">
            <span class="real">oh my god i just realized that i LOVE girls so much oh god holy shit</span>
            <span class="fake">it has a tiny bit of everything for everyone. you will find something that will help you</span>
        </span>
    </Card>
    <Card title="CairoX" pfp={CairoXPFP} role="Creator of Lucid Nightmares">
        <span class="alk-review">
            <span class="real">sir a second mod has hit the game in years</span>
            <span class="fake">the best mod to hit this game in years</span>
        </span>
    </Card>
    <Card title="mcres" pfp={McresPFP} role="Creator">
        honestly its the greatest qol mod I've used in any program ever
    </Card>
</div>

<span id="support"/>

<Gap size="small"/>

<h2>Made Possible by Your Support</h2>
<Section>
    <p>
        I'm a 20-year-old university student living on my own, and developing BetterEdit 
        would not be possible without the support of its users.
    </p>
    <p>
        If you like the mod and would like to give me a small 
        thank you, I would highly appreciate donating on my <em>Ko-fi</em>!
    </p>
    <p>
        I currently don't have anything else to offer to supporters than my <em>eternal gratitude</em>, 
        although I am planning on making extra Pro features in the future that supporters get access to!
    </p>
    <Button style="support-filled" href="https://ko-fi.com/hjfod" icon="kofi">Donate on Ko-Fi</Button>
    <Box>
        Please only donate if you have the money to do so. I do not want other starving students to give me their
        last pennies. <em class="alt">Take care of yourself first!</em> <Icon icon="heart" --icon-size=1em --icon-color=var(--accent-500)/>
    </Box>
</Section>

<style lang="scss">
    @use '$lib/styles/media-queries.scss' as *;

    .title-and-screenshots {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: var(--gap-large);
        align-items: center;
        justify-content: space-between;

        @include lt-lg {
            flex-direction: column;
            justify-content: center;
        }

        .title-column {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: var(--gap-normal);
            
            @include lt-lg {
                align-items: center;
            }

            h3 {
                max-width: 36ch;
            }

            .title {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: var(--gap-normal);
            
                @include lt-lg {
                    // flex-direction: row;
                    align-items: center;
                }

                .betteredit-logo {
                    display: flex;
                    height: 8rem;
                    fill: var(--text-50);

                    & > :global(svg) {
                        width: 100%;
                        height: 100%;
                    }
            
                    @include lt-lg {
                        height: 6rem;
                    }
                }
            }
        }
    }
    .feature-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: start;
        gap: var(--gap-small);
            
        @include lt-lg {
            justify-content: center;
        }
    }
    .testimonial-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: stretch;
        gap: var(--gap-small);
            
        @include lt-lg {
            justify-content: center;
        }
    }
    .alk-review {
        display: contents;
        & > .fake {
            opacity: 100%;
            transition-duration: var(--transition-duration);
        }
        & > .real {
            position: absolute;
            width: min(30ch, 40vw);
            opacity: 0%;
            user-select: none;
            transition-duration: var(--transition-duration);
            color: var(--accent-300);
        }
        &:hover {
            & > .fake {
                opacity: 0%;
            }
            & > .real {
                opacity: 100%;
            }
        }
    }
</style>
