from flask import Flask, request
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from config import DevConfig
from models import Recipe
from exts import db
from flask_migrate import Migrate
import rclpy
import threading
from rclpy.executors import MultiThreadedExecutor
from rclpy.executors import SingleThreadedExecutor
from ros2_ws.py_pubsub.py_pubsub.publisher_member_function import MinimalPublisher
from ros2_ws.py_pubsub.py_pubsub.subscriber_member_function import MinimalSubscriber
#from ros2_comunication import *
app=Flask(__name__)
CORS(app)
app.config.from_object(DevConfig)

db.init_app(app)

migrate=Migrate(app,db)

api=Api(app,doc='/docs')

#operation for robot
operation={}
#model {serializer}
recipe_model=api.model(
    "Recipe",
    {
        "id":fields.Integer(), 
        "title":fields.String(),
        "description":fields.String()
    }
)

@app.route('/api/run-code', methods=['POST'])
def run_code():
    data = request.json
    code = data.get('code')

    try:
        # Thực thi mã Python an toàn
        exec_globals = {}
        exec(code, exec_globals)
        return jsonify({'result': exec_globals.get('result')})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message':'Hello World!!!'}




@api.route('/sendingRequest') 
class RecipesResource(Resource):
    # @api.marshal_list_with(recipe_model)
    # def get(self):
    #     """Get all recipes"""
    #     recipes=Recipe.query.all()
    #     return recipes,201
    
    @api.marshal_with(recipe_model)   
    def post(self):
        """Send request to robot"""
        global operation
        operation = request.get_json()
        create_publisher(operation)
        return "sucessful",201
    
# @api.route('/recipe/<int:id>')
# class RecipeResource(Resource):
    
#     @api.marshal_with(recipe_model)
#     def get(self,id):
#         """Get a recipe"""
#         recipe=Recipe.query.get_or_404(id)
#         return recipe
    
#     @api.marshal_with(recipe_model)    
#     def put(self,id):
#         """Update a recipe by id"""
#         update_to_recipe=Recipe.query.get_or_404(id)
#         data=request.get_json()
#         update_to_recipe.update(data['title'],data['description'])
#         return update_to_recipe,201
    
#     @api.marshal_with(recipe_model)
#     def delete(self,id):
#         """Delete a recipe"""
#         recipe_to_delete=Recipe.query.get_or_404(id)
#         recipe_to_delete.delete()
#         return recipe_to_delete,204
    
    
# @app.shell_context_processor
# def make_shell_context():
#     return {
#         "db":db,
#         "Recipe":Recipe
#         }

    
#def create_subcriber(executor_sudcribe):
    
    #subcribe_node=MinimalSubscriber()
    #rclpy.spin(subcribe_node)
    #executor_sudcribe.spin()
    

def create_publisher(operation):
    global publish_node
    if publish_node is None:
        publish_node = MinimalPublisher(operation)
    else:
        publish_node.direction = operation
        publish_node.sending_request()

    

if __name__=='__main__':
    rclpy.init()
    global publish_node
    publish_node = None
    #subcribe_node=MinimalSubscriber()
    #executor_subcribe=SingleThreadedExecutor()
    #executor_subcribe.add_node(subcribe_node)
    #t1=threading.Thread(target=create_subcriber,args=(executor_subcribe,))
    #t1.start()
    app.run()
    rclpy.shutdown()
