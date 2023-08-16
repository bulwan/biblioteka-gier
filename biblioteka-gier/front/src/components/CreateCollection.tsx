function CreateCollection() {
    return (
        <>
            <div className="newCollection">
                <form>
                    <input
                        className="newCollection-name"
                        placeholder="Name for your new collection"
                    />
                    <button type="submit" value="Create collection" />
                </form>
            </div>
        </>
    );
}
export default CreateCollection;
