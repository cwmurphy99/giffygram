export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
        <div class="copyright">
            &copy;2021 DON'T STEAL MY SHIT
            </div>
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>????</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                </select>
                <span id="postCount">0</span>
            </div>
            
        </footer>
    `
}