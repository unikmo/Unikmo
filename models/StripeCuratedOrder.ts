import mongoose,{Schema,type Document,type Model} from 'mongoose';
export interface IStripeCuratedOrder extends Document {
  sessionId:string;email:string;sku:string;extraCards:number;totalCents:number;status:'pending'|'notified'|'needs_attention';
}
const schema=new Schema<IStripeCuratedOrder>({
  sessionId:{type:String,required:true,unique:true,index:true},
  email:{type:String,required:true,lowercase:true},
  sku:{type:String,required:true},
  extraCards:{type:Number,default:0},
  totalCents:{type:Number,required:true},
  status:{type:String,enum:['pending','notified','needs_attention'],default:'pending'}
},{timestamps:true});
const StripeCuratedOrder:Model<IStripeCuratedOrder>=mongoose.models.StripeCuratedOrder||mongoose.model<IStripeCuratedOrder>('StripeCuratedOrder',schema);
export default StripeCuratedOrder;
