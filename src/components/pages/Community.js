import React, {Component} from "react";
import PageTemplate from "../templates/PageTemplate";
import ShowcaseService from "../../services/ShowcaseService";
import IntroHero from "../molecules/IntroHero";
import ErrorTemplate from "../templates/ErrorTemplate";
import CardGroup from "../organisms/CardGroup";
import Card from "../molecules/Card";
import sortArrayBy from "../../helpers/sortArrayBy";

class Community extends Component {
    state = {
        loaded: false,
        showcase_posts: []
    };

    async getShowcasePosts() {
        try {
            const posts = await ShowcaseService.getAllPosts();

            this.setState({
                loaded: true,
                showcase_posts: posts
            });
        } catch (error) {
            this.setState({
                error
            });
        }
    }

    componentDidMount() {
        this.getShowcasePosts();
    }

    render() {
        const {error, loaded, showcase_posts } = this.state;

        if (error) {
            return <ErrorTemplate message={error.message} />;
        }

        if (loaded) {
            return (
                <PageTemplate page="Community">
                    <IntroHero
                        title="Community"
                    />
                    <main>
                        <section id="community-showcase">
                            <h2>
                                Community Showcase
                            </h2>
                            <CardGroup>
                                {sortArrayBy(showcase_posts[0], "title").map((post) => (
                                    <Card
                                        title={post.title}
                                        description={post.description}
                                    />
                                ))}
                            </CardGroup>
                        </section>
                    </main>
                </PageTemplate>
            );
        }

        return <p>Loading...</p>;
    }
}

export default Community;