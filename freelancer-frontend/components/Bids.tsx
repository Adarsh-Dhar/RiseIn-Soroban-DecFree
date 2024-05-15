export const Bids = () => {
    return (
        <div className="flex flex-col space-y-4">
            
            <input
                type="number"
                placeholder="Price"
                className="border border-gray-300 rounded-md p-2"
            />
            <input
                type="date"
                placeholder="Deadline"
                className="border border-gray-300 rounded-md p-2"
            />
        </div>
    );
}