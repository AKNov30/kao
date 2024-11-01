// app/home/[bet_id]/page.js
export default async function CreateBill({ params }) {
    const { bet_id } = params;
  
    return (
      <div className="p-6">
        { bet_id }
      </div>
    );
  }  