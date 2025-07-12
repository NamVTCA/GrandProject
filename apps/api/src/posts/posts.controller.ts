import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserDocument } from '../auth/schemas/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser() user: UserDocument, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(user, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserDocument) {
    return this.postsService.deletePost(id, user);
  }

  // --- Bình luận ---
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  addComment(
    @Param('id') postId: string,
    @GetUser() user: UserDocument,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.addComment(postId, user, createCommentDto);
  }

  @Get(':id/comments')
  findComments(@Param('id') postId: string) {
    return this.postsService.findCommentsByPost(postId);
  }

  // --- Lượt thích ---
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  toggleLike(@Param('id') postId: string, @GetUser() user: UserDocument) {
    return this.postsService.toggleLike(postId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/repost')
  repost(
    @Param('id') originalPostId: string,
    @GetUser() user: UserDocument,
    @Body('content') content?: string,
  ) {
    return this.postsService.repost(originalPostId, user, content);
  }

  @Get('user/:authorId')
  findPostsByAuthor(@Param('authorId') authorId: string) {
    return this.postsService.findPostsByAuthor(authorId);
  }
}
