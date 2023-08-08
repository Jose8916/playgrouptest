from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow 
from flask_cors import CORS 
 
app = Flask(__name__)
CORS(app)
                           
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/flaskreact'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
 
ma=Marshmallow(app)
 
class Products(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(100))
    date = db.Column(db.DateTime,default=datetime.datetime.now)
 
    def __init__(self,name,description):
        self.name=name
        self.description=description
 
 
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id','name','description','date')
 
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
 
@app.route('/listproducts',methods =['GET'])
def listproducts():
    all_products = Products.query.all()
    results = products_schema.dump(all_products)
    return jsonify(results)
 
@app.route('/productdetails/<id>',methods =['GET'])
def productdetails(id):
    product = Products.query.get(id)
    return product_schema.jsonify(product)
 
@app.route('/productupdate/<id>',methods = ['PUT'])
def productupdate(id):
    product = Products.query.get(id)
 
    name = request.json['name']
    description = request.json['description']
 
    product.name = name
    product.description = description
 
    db.session.commit()
    return product_schema.jsonify(product)
 
@app.route('/productdelete/<id>',methods=['DELETE'])
def productdelete(id):
    product = Products.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return product_schema.jsonify(product)
 
@app.route('/productadd',methods=['POST'])
def productadd():
    name = request.json['name']
    description = request.json['description']
 
    products = Products(name,description)
    db.session.add(products)
    db.session.commit()
    return product_schema.jsonify(products)
 
if __name__=='__main__':
    app.run(debug=True)