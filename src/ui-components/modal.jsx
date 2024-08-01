/**
 * returned via route from HTMX
 */
export const loginModal = () => {
    return (
      <div id="modal">
      <div class="modal-underlay" hx-on="click" hx-delete="/delete-modal" hx-swap="outerHTML" hx-target="#modal"></div>
      <div class="modal-content">
        <h1>Login</h1>
        <a href="/accounts/github/login/callback"> Log in with Github</a>
        <br />
        <button class="close" hx-on="click" hx-delete="/delete-modal" hx-swap="outerHTML" hx-target="#modal">Close</button>
      </div>
    </div>  
    );
}

/**
 */
export const searchModal = () => {
    return (
        <div id="modal">
        <div class="modal-underlay" hx-on="click" hx-delete="/delete-element" hx-swap="outerHTML" hx-target="#modal"></div>
        <div class="modal-content">
          <h1>Add RSS Feed</h1>
            <input
                type="search"
                id="rssAdd"
                name="q"
                placeholder="RSS Feed URL"
                required />
            <button>Search</button>
          <br />
          something here
          <br />
          <button class="close" hx-on="click" hx-delete="/delete-element" hx-swap="outerHTML" hx-target="#modal">Close</button>
        </div>
      </div>
    
    );
}