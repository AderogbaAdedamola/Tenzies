import gitHub from "./assets/gitHub.svg"

export default function Footer() {
    return(
        <footer>
            <a href="https://github.com/AderogbaAdedamola/" target="_blank">
                <img src={gitHub} alt="GitHub" />
                <p>Aderogba Adedamola</p>
            </a>
        </footer>
    )
}